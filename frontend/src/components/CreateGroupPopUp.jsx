import { useState } from "react";

import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";

export function CreateGroupPopUp({onCancel, onConfirm}) {
    const [groupName, setGroupName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleStart = () => {
        if (groupName === "test") setErrorMsg(`"${groupName}" is already existed`);
        else onConfirm(groupName);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
            <div
                className={`bg-white p-8 shadow-card relative flex flex-col space-y-4 rounded-3xl w-[30%] min-w-[450px] min-h-[250px] max-w-[1200px] justify-center items-center`}
            >
                {/* Items */}
                <p className="text-h2 font-semibold text-black text-center">
                    Create New Group Chat
                </p>
                <div className="space-y-2 w-full">
                    <div className="flex items-center gap-2">
                        <p className="text-h3 font-semibold text-black self-start">Group Name</p>
                        <p className="text-subtle font-thin text-primary-orange">
                            {errorMsg}
                        </p>
                    </div>
                </div>
                <TextInput
                    value={groupName}
                    onChange={setGroupName}
                    placeholder="Enter your group name"
                    className="w-full"
                />
                {/* Buttons */}
                <div className="mt-4 flex w-full justify-center gap-4">
                    <Button color="blue" onClick={onCancel} className="font-medium">
                        Cancel
                    </Button>
                    <Button color="yellow" disabled={groupName === ""} onClick={handleStart} className="font-medium">
                        Create
                    </Button>
                </div>
            </div>
        </div>
    )
}