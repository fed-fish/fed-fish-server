const domainWhitelist = [
	process.env.CLIENT_URL,
];

export function makeDomainWhitelist(): string[] {
	const domains: string[] = [];

	domainWhitelist.forEach((domain) => {
		if (domain !== undefined) {
			domains.push(domain);
		}
	});

	console.log(domains);

	return domains;
}
