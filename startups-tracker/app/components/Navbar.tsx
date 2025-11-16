import { auth, signIn, signOut } from "@/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Navbar() {
    const session = await auth();
    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between text-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo"  width={100} height={30}></Image>
                </Link>
                <div className="flex gap-5 items-center text-black">
                    {session && session?.user ? (
                        <>
                            <Link href="/startup/create">
                                <span>Create</span>
                            </Link>

                            <form action={async () => {"use server"; await signOut({redirectTo: "/"});}}>
                                <button type="submit">
                                    <span>Logout</span>
                                </button>
                            </form>

                            <Link href={`user/${session?.user?.id}`}>
                                <span>{session?.user?.name}</span>
                            </Link>
                        </>
                    ): (<>
                        <form action={async () => {"use server"; await signIn("google")}}>
                            <button type="submit">Login</button>
                        </form>
                    </>)}
                </div>  
                
            </nav>
        </header>
    );
}