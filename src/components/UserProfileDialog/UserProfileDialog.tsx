import React, {useState} from 'react';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '../ui/dialog';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {Button} from '../ui/button';
import {Textarea} from '../ui/textarea';
import {User, Image as ImageIcon, Save} from 'lucide-react';
import styles from './UserProfileDialog.module.css';
import {STORAGE_KEYS} from '@/modules/storage/storage.consts';

interface UserData {
  name: string;
  email: string;
  avatar: string;
  hobbies: string[];
}

interface UserProfileDialogProps {
  userData: UserData;
}

const UserProfileDialog: React.FC<UserProfileDialogProps> = ({userData}) => {
  const [formData, setFormData] = useState<UserData>({...userData});
  const [hobbiesText, setHobbiesText] = useState(userData.hobbies.join(', '));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleHobbiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHobbiesText(e.target.value);
  };

  const handleSubmit = () => {
    // Parse hobbies from comma-separated text
    const hobbies = hobbiesText
      .split(',')
      .map((hobby) => hobby.trim())
      .filter((hobby) => hobby !== '');

    const updatedUserData = {
      ...formData,
      hobbies,
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(updatedUserData));

    // In a real app, you would submit this to a backend
    console.log('Updated user data:', updatedUserData);
  };

  return (
    <DialogContent className={styles.dialogContent}>
      <DialogHeader>
        <DialogTitle className={styles.dialogTitle}>Edit Profile</DialogTitle>
        <DialogDescription>Update your personal information and preferences</DialogDescription>
      </DialogHeader>

      <div className={styles.form}>
        <div className={styles.avatarSection}>
          <div className={styles.avatarPreview}>
            {formData.avatar ? (
              <img src={formData.avatar} alt="Profile" className={styles.avatarImage} />
            ) : (
              <div className={styles.avatarPlaceholder}>
                <User size={40} />
              </div>
            )}
          </div>
          <div className={styles.avatarUpload}>
            <Button variant="outline" className={styles.uploadButton}>
              <ImageIcon size={16} />
              <span>Change Picture</span>
            </Button>
            <p className={styles.uploadHint}>JPG, GIF or PNG. Max size 800K</p>
          </div>
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          <p className={styles.fieldHint}>Email cannot be changed</p>
        </div>

        <div className={styles.formGroup}>
          <Label htmlFor="hobbies">Hobbies & Interests</Label>
          <Textarea
            id="hobbies"
            name="hobbies"
            value={hobbiesText}
            onChange={handleHobbiesChange}
            placeholder="Hiking, Reading, Photography..."
            className={styles.textarea}
          />
          <p className={styles.fieldHint}>Separate hobbies with commas</p>
        </div>
      </div>

      <DialogFooter className={styles.footer}>
        <DialogClose asChild>
          <Button variant="outline" className={styles.cancelButton}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={handleSubmit} className={styles.saveButton}>
            <Save size={16} />
            <span>Save Changes</span>
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default UserProfileDialog;
