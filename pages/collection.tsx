import Card from "@/components/Card";

export default function Collection() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="-mt-12 text-2xl">Collection</h1>
            <div className="p-6 m-1">
                <Card src={"/cards/black_lotus.png"}/>
            </div>
        </div>
    )
}
