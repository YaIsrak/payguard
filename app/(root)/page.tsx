import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';

export default async function Home() {
	const user = await currentUser();

	return (
		<div>
			Hello world
			<SignInButton>
				<button>Sign in</button>
			</SignInButton>
			<SignOutButton>
				<button>Sign out</button>
			</SignOutButton>
			<pre>{JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}
