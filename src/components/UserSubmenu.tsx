
import React from 'react';
import { User, Settings, Image, LogOut, Heart, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Dialog, DialogTrigger } from './ui/dialog';
import UserProfileDialog from './UserProfileDialog';
import styles from './UserSubmenu.module.css';

interface UserSubmenuProps {
  onLogout: () => void;
}

const UserSubmenu: React.FC<UserSubmenuProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  // Use stored user data or defaults
  const userData = {
    name: user.name || 'User',
    email: user.email || 'user@example.com',
    avatar: user.avatar || '',
    hobbies: user.hobbies || [],
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className={styles.trigger}>
          <button className={styles.profileButton} aria-label="User menu">
            <Avatar className={styles.avatar}>
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback className={styles.avatarFallback}>
                {userData.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={styles.content} align="end">
          <div className={styles.userInfo}>
            <Avatar className={styles.menuAvatar}>
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className={styles.userDetails}>
              <span className={styles.userName}>{userData.name}</span>
              <span className={styles.userEmail}>{userData.email}</span>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={styles.menuItem} onSelect={() => navigate('/profile')}>
            <User size={18} />
            <span>View Profile</span>
          </DropdownMenuItem>
          <DialogTrigger asChild>
            <DropdownMenuItem className={styles.menuItem}>
              <User size={18} />
              <span>Edit Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className={styles.menuItem} onSelect={() => navigate('/settings')}>
            <Settings size={18} />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.menuItem}>
            <Image size={18} />
            <span>Change Picture</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.menuItem}>
            <Heart size={18} />
            <span>My Hobbies</span>
          </DropdownMenuItem>
          <DropdownMenuItem className={styles.menuItem}>
            <Shield size={18} />
            <span>Emergency Contacts</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className={styles.menuItem} onSelect={onLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UserProfileDialog userData={userData} />
    </Dialog>
  );
};

export default UserSubmenu;
