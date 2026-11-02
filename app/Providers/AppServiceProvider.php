<?php

namespace App\Providers;

use App\Contracts\AcademicContentRepository;
use App\Data\ConfigAcademicContentRepository;
use Illuminate\Support\ServiceProvider;

final class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(AcademicContentRepository::class, ConfigAcademicContentRepository::class);
    }

    public function boot(): void
    {
        config(['database.connections' => [], 'filesystems.disks.local.serve' => false, 'inertia.devtools.enabled' => false]);
    }
}
