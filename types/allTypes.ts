export interface User {
    userId: string;
    name: string;
    email: string;
    newPassword: string;
    image: string | null;
}
export interface Group {
    id: string;
    isGroupChat: boolean;
    users: User[];
}

export interface ProfileCardsProps {
    onSelectGroup: (groupId: string, groupName: string) => void;
}


export interface BottomNavigationProps {
    flip: boolean;
    setFlip: React.Dispatch<React.SetStateAction<boolean>>;
    isSearchActive: boolean;
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export interface IconButtonProps {
    src: string;
    alt: string;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
    setIsSearchActive: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface Message {
    id: string;
    content: string;
    senderId: string;
    groupId: string;
    createdAt: string;
}

export interface ChatBoxProps {
    groupId: string;
    groupName: string;
    onBackClick?: () => void;
}

export interface ChatHeaderProps {
    groupName: string;
    onBackClick?: () => void;
}

export interface ChatInputProps {
    newMessage: string;
    setNewMessage: (message: string) => void;
    handleSendMessage: () => void;
    isSending: boolean;
}

export interface ChatMessagesProps {
    messages: Message[];
    loading: boolean;
    groupId: string;
}

export interface ChatViewProps {
    isSmallScreen: boolean;
    showChatOnSmallScreen: boolean;
    selectedGroup: { groupId: string; groupName: string } | null;
    onSelectGroup: (groupId: string, groupName: string) => void;
    onBackClick: () => void;
    userName?: string;
}

export interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddUser: (email: string) => void;
}

export interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string | null;
    initials: string;
    onClose: () => void;
}


export interface UpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    onUpdateUser: (name: string, image: File | null, newPassword: string) => void;
}

  export interface ProfileCardsState {
  groups: Group[];
  filteredGroups: Group[];
  loading: boolean;
  error: string | null;
  dropdownOpen: boolean;
  isUpdateModalOpen: boolean;
  isAddUserModalOpen: boolean;
  selectedUser: User | null;
  flip: boolean;
  isImageModalOpen: boolean;
  modalImageUrl: string | null;
  modalInitials: string;
  isSearchActive: boolean;
  searchQuery: string;
  selectedGroupId: string | null;
}



export interface Group {
    id: string;
    isGroupChat: boolean;
    users: User[];
  }
  
  export interface User {
    name: string;
    image: string | null;
    email: string;
  }
  
  export interface ProfileCardsProps {
    onSelectGroup: (groupId: string, groupName: string) => void;
  }
  
  export interface DropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdateProfile: (user: User) => void;
    onAddUser: () => void;
  }
  
  export interface UserAvatarProps {
    user: User;
    showStatus?: boolean;
    onImageClick: (imageUrl: string | null, initials: string) => void;
  }
  
  export interface GroupItemProps {
    group: Group;
    isSelected: boolean;
    onSelect: (group: Group, event: React.MouseEvent) => void;
    onImageClick: (imageUrl: string | null, initials: string) => void;
  }