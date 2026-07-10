import Navbar from "@/components/shared/Navbar";
import { Button } from "@heroui/react";
import Image from "next/image";

export default function Home() {
    return (
        <div>
            <Navbar />
            <h1>Landing Page</h1>
            <Button className={'p-5 text-green-700 bg-green-200'}>Hello World</Button>
        </div>
    );
}
