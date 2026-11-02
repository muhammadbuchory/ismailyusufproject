<?php

use App\Contracts\AcademicContentRepository;
use Inertia\Testing\AssertableInertia as Assert;

it('serves all public modules and the demonstration dashboard without a database', function () {
    $this->withoutVite();
    $modules = array_merge(['', 'about', 'profile', 'education', 'research', 'publications', 'teaching', 'supervision', 'news', 'voices', 'cv', 'statistics', 'contact', 'dashboard'], array_keys(config('academic.catalog')));
    foreach ($modules as $module) {
        $this->get('/'.$module)->assertOk();
    }
    expect(config('database.connections'))->toBe([]);
    expect(config('session.driver'))->toBe('array');
});
it('returns deterministic normalized public records and derived metrics', function () {
    $provider = app(AcademicContentRepository::class);
    expect($provider->records('research'))->toHaveCount(3);
    expect($provider->records('research')[0]['year'])->toBeInt();
    expect($provider->statistics()[0]['value'])->toBe(count($provider->records('publications')));
    foreach ($provider->records('supervision') as $record) {
        expect($record)->not->toHaveKey('studentId');
    }
});
it('projects extended and private information only into explicit demo modes', function () {
    $provider = app(AcademicContentRepository::class);
    expect($provider->cv('public'))->not->toHaveKeys(['extended', 'private']);
    expect($provider->cv('extended'))->toHaveKey('extended')->not->toHaveKey('private');
    expect($provider->cv('private'))->toHaveKeys(['extended', 'private']);
    $this->withoutVite()->get('/cv')->assertInertia(fn (Assert $page) => $page->component('Portfolio')->where('cvMode', 'public')->missing('cvSections.extended')->missing('cvSections.private'));
    $this->get('/')->assertInertia(fn (Assert $page) => $page->missing('cvSections')->missing('records'));
    $this->get('/cv?mode=invalid')->assertNotFound();
});
it('excludes restricted records before serialization', function () {
    $records = config('academic.research');
    $records[] = ['id' => 'secret', 'visibility' => 'private', 'title' => 'Restricted marker'];
    config(['academic.research' => $records]);
    expect(app(AcademicContentRepository::class)->records('research'))->toHaveCount(3);
});
it('resolves research details and rejects unknown sections or records', function () {
    $this->withoutVite()->get('/research/research-1')->assertOk()->assertInertia(fn (Assert $page) => $page->where('detail', true)->has('records', 1));
    $this->get('/research/missing')->assertNotFound();
    $this->get('/unknown-section')->assertNotFound();
});
