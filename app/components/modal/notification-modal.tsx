'use client'

import React, {useEffect, useState} from 'react'
import {X} from 'lucide-react'
import {Button} from "@/components/common/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/common/dialog"
import {ScrollArea} from "@/components/common/scroll-area"
import {useLanguage} from "@/language/language-context";
import translations from "@/language/translations";

interface Notification {
    id: string
    title: string
    message: string
    timestamp: string
    read: boolean
}

export default function NotificationsModal() {
    const fetchNotifications = async (memberId: string) => {
        try {
            const response = await fetch('http://localhost:8080/v1/notifications?memberId=' + memberId)
            if (!response.ok) {
                throw new Error('Failed to fetch notifications')
            }
            return await response.json()
        } catch (error) {
            console.error('Error fetching notifications:', error)
            return []
        }
    }

    const [isOpen, setIsOpen] = useState(false)
    const [notifications, setNotifications] = useState<Notification[]>([])
    const { language } = useLanguage()
    const translationText = translations[language]

    useEffect(() => {
        if (localStorage.getItem('memberId')) {
            fetchNotifications(localStorage.getItem('memberId') as string).then((notifications) => setNotifications(notifications))
        }
    }, []);

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notification =>
            notification.id === id ? {...notification, read: true} : notification
        ))
    }

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(notification => notification.id !== id))
    }

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => {
            if (localStorage.getItem('memberId')) {
                setIsOpen(isOpen)
            } else {
                alert('Please sign in to view notifications')
            }
        }}>
            <DialogTrigger asChild>
                <Button className="w-full text-left justify-left relative">
                    <h2 className="text-xl font-semibold mb-2">
                        {translationText.notification}
                    </h2>
                    {unreadCount > 0 && (
                        <span
                            className="bg-[#84cc16] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ml-4 mb-2">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Notifications</DialogTitle>
                    <DialogDescription>
                        Stay updated with your latest activities
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className="flex-grow overflow-y-auto">
                    {notifications.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No notifications</p>
                    ) : (
                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-4 rounded-lg border ${notification.read ? 'bg-background' : 'bg-muted'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{notification.title}</h3>
                                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => deleteNotification(notification.id)}
                                        >
                                            <X className="h-4 w-4"/>
                                        </Button>
                                    </div>
                                    {!notification.read && (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            onClick={() => markAsRead(notification.id)}
                                            className="mt-2 p-0 h-auto"
                                        >
                                            Mark as read
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    )
}