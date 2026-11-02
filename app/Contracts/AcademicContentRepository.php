<?php

namespace App\Contracts;

interface AcademicContentRepository
{
    public function profile(): array;

    public function records(string $module): array;

    public function catalog(): array;

    public function voices(): array;

    public function cv(string $mode): array;

    public function statistics(): array;
}
