import { createContext, useContext, useState } from "react";

interface HeaderAndFooterContextType {
    showHeader: boolean;
    showFooter: boolean;
    setShowHeader: (show: boolean) => void;
    setShowFooter: (show: boolean) => void;
}

const HeaderAndFooterContext = createContext<HeaderAndFooterContextType>({
    showHeader: true,
    showFooter: true,
    setShowHeader: () => {},
    setShowFooter: () => {}
});

export function HeaderAndFooterProvider({ children }: { children: React.ReactNode }) {
    const [showHeader, setShowHeader] = useState(true);
    const [showFooter, setShowFooter] = useState(true);
    return (
        <HeaderAndFooterContext.Provider value={{ showHeader, showFooter, setShowHeader, setShowFooter }}>
            {children}
        </HeaderAndFooterContext.Provider>
    );
}

export function useNav() {
    const context = useContext(HeaderAndFooterContext);
    if (!context) {
        throw new Error("useNav must be used within a HeaderAndFooterProvider");
    }
    return context;
}