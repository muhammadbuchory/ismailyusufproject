<?php

namespace App\Http\Controllers;

use App\Contracts\AcademicContentRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

final class PortfolioController extends Controller
{
    public function __construct(private AcademicContentRepository $content) {}

    public function show(Request $request, string $section = 'home', ?string $id = null): Response
    {
        $allowed = array_merge(['home', 'about', 'profile', 'research', 'publications', 'teaching', 'supervision', 'news', 'voices', 'cv', 'statistics', 'contact', 'education', 'dashboard'], array_keys($this->content->catalog()));
        abort_unless(in_array($section, $allowed, true), 404);
        $props = ['section' => $section, 'profile' => $this->content->profile(), 'catalog' => array_map(fn ($m) => ['title' => $m['title'], 'subtitle' => $m['subtitle']], $this->content->catalog()), 'statistics' => $this->content->statistics()];
        if ($section === 'home' || $section === 'about' || $section === 'profile') {
            foreach (['research', 'publications', 'education', 'news', 'awards'] as $module) {
                $props[$module] = $this->content->records($module);
            }
            $props['voices'] = $this->content->voices();
        } elseif ($section === 'cv') {
            $mode = $request->query('mode', 'public');
            abort_unless(in_array($mode, ['public', 'extended', 'private'], true), 404);
            $props['cvMode'] = $mode;
            $props['cvSections'] = $this->content->cv($mode);
        } elseif ($section === 'dashboard') {
            $props['records'] = array_merge($this->content->records('publications'), $this->content->records('research'));
        } elseif ($section === 'voices') {
            $props['voices'] = $this->content->voices();
        } elseif (! in_array($section, ['statistics', 'contact'], true)) {
            $records = $this->content->records($section);
            if ($id !== null) {
                $records = array_values(array_filter($records, fn ($r) => $r['id'] === $id));
                abort_if($records === [], 404);
                $props['detail'] = true;
            }
            $props['records'] = $records;
        }

        return Inertia::render('Portfolio', $props);
    }
}
