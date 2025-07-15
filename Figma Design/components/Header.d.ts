type CurrentPage = 'dashboard' | 'jobs' | 'roofers' | 'customers' | 'add-roofer' | 'edit-roofer' | 'add-customer' | 'edit-customer';
interface HeaderProps {
    onChatToggle: () => void;
    currentPage: CurrentPage;
    onPageChange: (page: CurrentPage) => void;
}
export declare function Header({ onChatToggle, currentPage, onPageChange }: HeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
