import { Button, Drawer } from "@heroui/react";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import SidebarFooter from "./SidebarFooter";
import SidebarLinks from "./SidebarLinks";
import SidebarHeader from "./SidebarHeader";

const DashboardSidebar = async () => {
    const user = {
        role: "user" as const,
        name: "Test User",
        email: "user@example.com"
    };

    return (
        <>
            {/* Desktop View Framework */}
            <aside className="hidden w-64 shrink-0 border-r border-default p-4 md:flex md:flex-col md:justify-between h-screen sticky top-0 bg-white dark:bg-slate-950">
                <div>
                    <SidebarHeader user={user} />
                    <SidebarLinks user={user} />
                </div>
                <div className="mt-auto border-t border-default pt-4 w-full">
                    <SidebarFooter />
                </div>
            </aside>

            {/* Mobile View Drawer Toggle */}
            <div className="p-4 fixed top-0 left-0 md:hidden z-40 bg-transparent">
                <Drawer>
                    <Button className="flex justify-between items-center mx-auto" variant="secondary">
                        <VscLayoutSidebarLeft className="w-5 h-5" />
                    </Button>
                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog className="h-full flex flex-col justify-between p-4 bg-white dark:bg-slate-950">
                                <div>
                                    <Drawer.CloseTrigger />
                                    <Drawer.Header className="px-0 pt-2 pb-2 mb-4">
                                        <Drawer.Heading className="w-full">
                                            <SidebarHeader user={user} />
                                        </Drawer.Heading>
                                    </Drawer.Header>
                                    <Drawer.Body className="px-0 overflow-y-auto">
                                        <SidebarLinks user={user} />
                                    </Drawer.Body>
                                </div>
                                <div className="mt-auto border-t border-default pt-4 w-full">
                                    <SidebarFooter />
                                </div>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
};

export default DashboardSidebar;