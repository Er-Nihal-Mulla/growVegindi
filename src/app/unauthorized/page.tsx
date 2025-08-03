
'use client';

import { Button } from "@/components/ui/button";
import { AppContext } from "@/context/app-context";
import Link from "next/link";
import { useContext, useEffect } from "react";

export default function UnauthorizedPage() {
    const { setIsLoading } = useContext(AppContext);

    useEffect(() => {
        setIsLoading(false);
    }, [setIsLoading]);

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-4xl font-bold text-destructive mb-4">Access Denied</h1>
            <p className="text-xl text-muted-foreground mb-8">You do not have permission to view this page.</p>
            <Link href="/">
                <Button onClick={() => setIsLoading(true)}>Go to Homepage</Button>
            </Link>
        </div>
    );
}
