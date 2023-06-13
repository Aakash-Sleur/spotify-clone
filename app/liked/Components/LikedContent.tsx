'use client'

import useOnPlay from "@/Hooks/useOnplay"
import { useUser } from "@/Hooks/useUser"
import LikedButton from "@/components/LikedButton"
import MediaItem from "@/components/MediaItem"
import { Song } from "@/types"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

interface LikedContentProps {
    songs: Song[]
}

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const onPlay = useOnPlay(songs)

    const { isLoading, user } = useUser();
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/")
        }
    }, [isLoading, user, router])

    if (songs.length === 0) {
        return (
            <div
                className="
                flex
                flex-col
                gap-y-2
                w-full
                px-6
                text-neutral-400
            ">
                No liked songs
            </div>
        )
    }
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song: any) => (
                <div
                    key={song.id}
                    className="
                    flex
                    items-center
                    gap-x-4
                    w-full
                ">
                    <div className="flex-1">
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <LikedButton songId={song.id} />
                </div>
            ))}
        </div>
    )
}

export default LikedContent