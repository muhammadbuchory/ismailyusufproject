<?php

namespace App\Data;

use App\Contracts\AcademicContentRepository;

final class ConfigAcademicContentRepository implements AcademicContentRepository
{
    public function profile(): array
    {
        return config('academic.profile');
    }

    public function catalog(): array
    {
        return config('academic.catalog');
    }

    public function voices(): array
    {
        return config('academic.voices');
    }

    public function records(string $module): array
    {
        $records = config('academic.'.$module, $this->catalog()[$module]['records'] ?? []);

        return array_values(array_filter($records, fn (array $record): bool => ($record['visibility'] ?? '') === 'public'));
    }

    public function statistics(): array
    {
        return [
            ['label' => 'Publications', 'value' => count($this->records('publications')), 'note' => 'Across scholarly formats'],
            ['label' => 'Research projects', 'value' => count($this->records('research')), 'note' => 'Connecting ideas to impact'],
            ['label' => 'Completed supervisions', 'value' => count(array_filter($this->records('supervision'), fn ($r) => $r['status'] === 'Completed')), 'note' => 'Supporting the next generation'],
            ['label' => 'Academic awards', 'value' => count($this->records('awards')), 'note' => 'Recognising contribution'],
        ];
    }

    public function cv(string $mode): array
    {
        $sections = [];
        foreach (['education', 'appointments', 'research', 'publications', 'teaching', 'supervision', 'awards', 'memberships', 'industry-experience', 'work-experience', 'publishing', 'conferences', 'intellectual-property', 'community', 'certifications', 'consultancy', 'involvement'] as $module) {
            $sections[$module] = $this->records($module);
        }
        if (in_array($mode, ['extended', 'private'], true)) {
            $sections['extended'] = config('academic.restricted.extended');
        }
        if ($mode === 'private') {
            $sections['private'] = config('academic.restricted.private');
        }

        return $sections;
    }
}
