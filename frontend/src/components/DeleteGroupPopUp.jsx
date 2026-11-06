import { Button } from "../components/Button";

export function DeleteGroupPopUp({onCancel, onConfirm}) {

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
            <div
                className={`bg-white p-8 shadow-card relative flex flex-col space-y-4 rounded-3xl w-[30%] min-w-[450px] min-h-[250px] max-w-[1200px] justify-center items-center`}
            >
                {/* Items */}
                <p className="text-h2 font-semibold text-black text-center">
                    Delete Group Chat
                </p>
                <div className="space-y-2 w-full">
                    <div className="flex items-center justify-center gap-2">
                        <p className="text-body font-semibold text-black">Are you sure to delete this group chat?</p>
                    </div>
                </div>
                {/* Buttons */}
                <div className="mt-4 flex w-full justify-center gap-4">
                    <Button color="blue" onClick={onCancel} className="font-medium">
                        Cancel
                    </Button>
                    <Button color="orange" onClick={onConfirm} className="font-medium">
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    )
}