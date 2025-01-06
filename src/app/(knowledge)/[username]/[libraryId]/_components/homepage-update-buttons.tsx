// src/app/(knowledge)/[username]/[libraryId]/_components/sidebar-update-buttons.tsx

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {BsSliders} from "react-icons/bs";
import {Switch} from "@/components/ui/switch"
import {updateLibrary} from "@/app/(knowledge)/[username]/[libraryId]/actions/update-library";
import {useNavigate, useSearchParams} from "react-router-dom";
import toast from "react-hot-toast";

const HomepageUpdateButtons = ({id, showDir, setShowDir, text}: {
    id: string
    text: string
    showDir: boolean;
    setShowDir: Function
}) => {
    const router = useNavigate()
    const [_s, setSearchParam] = useSearchParams()

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className={`p-2 border flex items-center rounded-md`}>
                        <BsSliders className={`size-5`}/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <div className={`flex flex-col`}>
                            <span>页面设置</span>
                            <span className={`text-xs text-gray-600/40`}>
                                选择是否显示以下模块，打开即为显示
                            </span>
                        </div>
                    </DropdownMenuLabel>
                    {/*不是item就不会点击后马上让dropdown关闭*/}
                    <div className={`p-2 flex gap-x-1 items-center`}>
                        <span>目录模块</span>
                        <Switch
                            checked={showDir}
                            onCheckedChange={() => {
                                setShowDir(!showDir)
                            }}
                        />
                    </div>
                    <DropdownMenuItem>
                        <span>自定义模块</span>
                        <Switch/>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <div className={`cursor-pointer p-2 border flex items-center rounded-md`}>
                <span
                    onClick={async () => {
                        await updateLibrary({id, text, showDir})
                        router(`/malred/${id}`)
                        // router.refresh()
                        
                        toast.success(`更新成功`)
                    }}
                    className={`text-sm`}>更新</span>
            </div>
        </>
    );
};

export default HomepageUpdateButtons;