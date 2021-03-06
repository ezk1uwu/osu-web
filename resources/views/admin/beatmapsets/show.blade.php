{{--
    Copyright (c) ppy Pty Ltd <contact@ppy.sh>. Licensed under the GNU Affero General Public License v3.0.
    See the LICENCE file in the repository root for full licence text.
--}}
@extends('master', ['titlePrepend' => trans('layout.header.admin.beatmapset')])

@section('content')
    @include('admin/_header')
    <div class="osu-page osu-page--admin">
        <h1>{{ $beatmapset->title }} - {{ $beatmapset->artist }}</h1>

        <ul>
            <li>{{ trans('admin.beatmapsets.show.discussion._') }}:
                @if ($beatmapset->discussion_enabled)
                    {{ trans('admin.beatmapsets.show.discussion.active') }}
                @else
                    {{ trans('admin.beatmapsets.show.discussion.inactive') }}
                    /
                    <a
                        href="{{ route('admin.beatmapsets.update', [
                            $beatmapset->getKey(),
                            'beatmapset[discussion_enabled]' => true,
                        ]) }}"
                        data-method="PUT"
                        data-confirm="{{ trans('admin.beatmapsets.show.discussion.activate_confirm') }}"
                    >{{ trans('admin.beatmapsets.show.discussion.activate') }}</a>
                @endif
            </li>
            <li><a href="{{ route('admin.beatmapsets.covers', $beatmapset->beatmapset_id) }}">{{ trans('admin.beatmapsets.show.covers') }}</a></li>
        </ul>
    </div>
@endsection
