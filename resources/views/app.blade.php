<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#102d4f">
    <meta name="color-scheme" content="light">
    <link rel="icon" href="/favicon.svg">
    @php
        $section = $page['props']['section'] ?? 'home';
        $label = $section === 'home' ? 'Research, Education & Impact' : ucwords(str_replace('-', ' ', $section));
        $canonical = request()->url();
        $isRestrictedDemo = $section === 'dashboard' || request()->query('mode', 'public') !== 'public';
    @endphp
    <title inertia>{{ $label }} | Ismail Yusuf - Academic Portfolio</title>
    <meta inertia="description" name="description" content="An illustrative academic portfolio of Ismail Yusuf. Explore demonstration research, publications, teaching, and professional contributions.">
    <link inertia="canonical" rel="canonical" href="{{ $canonical }}">
    <meta inertia="og:title" property="og:title" content="{{ $label }} | Ismail Yusuf">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ $canonical }}">
    @if($isRestrictedDemo)<meta name="robots" content="noindex,nofollow">@endif
    @if($section === 'home')
        <script type="application/ld+json">{!! json_encode(['@context'=>'https://schema.org','@type'=>'Person','name'=>'Ismail Yusuf','description'=>'Illustrative academic portfolio. Academic affiliations and achievements are demonstration data, not verified facts.','url'=>url('/')], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_SLASHES) !!}</script>
    @endif
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.tsx'])
    @inertiaHead
</head>
<body>@inertia</body>
</html>
