import { Crown } from "lucide-react";
import { Button } from "../components/Button";

import MembersMock from "./MembersMock";

export function ViewMembersPopUp({onConfirm}) {

    const sortedMembers = [...MembersMock].sort((a, b) => {
        if (a.role === 'leader') return -1;
        if (b.role === 'leader') return 1;
        return 0;
    });

    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20 backdrop-blur-sm">
            <div
                className={`bg-white p-8 shadow-card relative flex flex-col space-y-4 rounded-3xl w-[30%] min-w-[450px] min-h-[250px] max-w-[1200px] justify-center items-center`}
            >
                {/* Header */}
                <p className="text-h2 font-semibold text-black text-center">
                    Members
                </p>
                {/* Member List */}
                <div className="w-full flex flex-col gap-4 max-h-[300px] overflow-y-auto px-4">
                    {sortedMembers.map((member) => (
                        <div key={member.id} className="flex items-center gap-4">
                            <img 
                                src={member.avatar} 
                                alt="avatar" 
                                className="w-12 h-12 rounded-full object-cover bg-blue" 
                            />
                            
                            <div className="flex items-center gap-2">
                                <p className="text-body font-medium text-black">
                                    {member.name}
                                </p>
                                
                                {/* show crown for leader */}
                                {member.role === "leader" && (
                                    <Crown 
                                        size={20} 
                                        className="fill-primary-yellow text-black stroke-[1.5]" 
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                {/* Buttons */}
                <Button
                    color="blue"
                    className="font-medium"
                    onClick={onConfirm}
                    >
                    Close
                </Button>
            </div>
        </div>
    )
}