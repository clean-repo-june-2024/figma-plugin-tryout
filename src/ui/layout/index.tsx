import { PropsWithChildren } from "react";
import { ModeToggle } from "../components/modeToggle";
import NavigationButtons from "../components/navigationButtons";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <div>
            <nav className="flex px-1 justify-end">
                <ModeToggle />
                <NavigationButtons />
            </nav>
            <main>{children}</main>
        </div>
    )
}

export default Layout;