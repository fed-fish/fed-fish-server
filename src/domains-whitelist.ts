const domainWhitelist = [
	process.env.CLIENT_LOCAL_NETWORK_URL,
	process.env.CLIENT_LOCAL_URL,
	process.env.CLIENT_DEPLOY_URL,
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
