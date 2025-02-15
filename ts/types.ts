import { FaUser } from "react-icons/fa";

interface IUser {
    id: string;
    username: string;
    email: string;
    role: string;
    profilePicture: string;
}

export enum UserRolesEnum {
    ADMIN = 'admin',
    USER = 'user',
}

export enum AlertTypeEnum {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning'
}

interface IBackOfficeSection {
    name: string;
    icon: typeof FaUser;
}
export const BackOfficeSections: Record<string, IBackOfficeSection> = {
    users: {
        name: 'Users',
        icon: FaUser
    }
}

interface IAlertProps {
    message: string;
    type: 'success' | 'error' | 'warning';
    onClose: () => void;
}

interface INotification {
    id: string;
    title: string;
    message: string;
    sentDate: Date;
    isRead: boolean;
}

const Days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const Months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

const Cities = [
    "London",
    "Paris",
    "Berlin",
    "Madrid",
    "Rome",
    "Amsterdam",
    "Brussels",
    "Vienna",
    "Copenhagen",
    "Stockholm",
    "Oslo",
    "Helsinki",
    "Warsaw",
    "Prague",
    "Budapest",
    "Dublin",
    "Lisbon",
    "Athens",
    "Zurich",
    "Munich",
    "Barcelona",
    "Milan",
    "Hamburg",
    "Lyon",
    "Frankfurt",
    "Venice",
    "Edinburgh",
    "Geneva",
    "Rotterdam",
    "Krakow",
    "Bergamo",
];

export type { IUser, IAlertProps, INotification, IBackOfficeSection };

export { Days, Months, Cities };
