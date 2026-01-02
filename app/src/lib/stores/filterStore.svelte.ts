import { browser } from '$app/environment';

function getCookie(name: string) {
	if (!browser) return '';
	const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
	return m ? decodeURIComponent(m[2]) : '';
}

function setCookie(name: string, value: string) {
	if (!browser) return;
	document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=31536000`;
}

export const filterStore = $state({
	keyword: getCookie('keyword') || '',
	atributo: getCookie('atributo') || ''
});

$effect.root(() => {
	$effect(() => {
		if (filterStore.keyword !== undefined)
			setCookie('keyword', filterStore.keyword);

		if (filterStore.atributo !== undefined)
			setCookie('atributo', filterStore.atributo);
	});
});

