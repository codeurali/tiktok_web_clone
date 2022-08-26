import React, {Dispatch, SetStateAction} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go' 

import useAuthStore from '../store/authStore'
import NoResults from './NoResults'

import {IUser} from '../types'

interface IProps {
    isPostingComment: boolean,
    comment: string,
    setComment: Dispatch<SetStateAction<string>>,
    addComment: (e: React.FormEvent) => void,
    comments: IComment[]
}

interface IComment {
    comment: string,
    lenght?: number,
    _key: string,
    postedBy: {
        _ref?: string,
        _id?: string
    }
}

const Comments = ({ comments,comment, setComment, addComment, isPostingComment }: IProps) => {

    const {userProfile, allUsers} = useAuthStore()

    console.log(comments?.map(comment => comment.postedBy) , allUsers.map((user: IUser) => user._id))

  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-[100px]'>
        <div className='overflow-scroll lg:h-[475px]' >
            {
                comments?.length ? (
                    <div>
                        {
                            comments?.map((item: IComment, idx: number)=> (
                                <>
                                    {allUsers.map((user: IUser)=> (
                                        user._id === (item.postedBy._ref|| item.postedBy._id) && (
                                            <div className='p-2 items-center' key={idx} >
                                                <Link href={`/profile/${user._id}`} >
                                                    <div className='flex items-start gap-3' >
                                                        <div className='w-8 h-8' >
                                                            <Image 
                                                                src={user.image} 
                                                                width={34} 
                                                                height={34}
                                                                className='rounded-full'
                                                                alt='profile photo'
                                                                layout='responsive' 
                                                            />
                                                            </div>
                                                            <div className='hidden xl:block' >
                                                            <p className='flex gap-1 item-center text-md font-bold text-primary lowercase items-center' > 
                                                                {user.userName.replaceAll(' ', '')} 
                                                                <GoVerified className='text-blue-400' />  
                                                            </p>
                                                            <p className='capitalize text-gray-400 text-xs' >
                                                                {user.userName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Link>
                                                <div>
                                                    <p className='text-[16px] mr-8' > {item.comment} </p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </>
                            ))
                        }
                    </div> ) : (
                        <NoResults text="No comments yet!" />
                    )
            }
        </div>
        {
            userProfile && (
                <div className='absolute bottom-0 left-0 pb-6 px-2 md:px-5' >
                    <form onSubmit={addComment} className='flex gap-3' >
                        <input 
                            type="text" 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Add a comment'
                            className='bg-primary px-6 py-4 text-md font-md border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'    
                        />
                        <button className='text-md text-gray-400' onClick={addComment} >
                            {isPostingComment ? 'Commenting...' : 'Comment'}
                        </button>
                    </form>
                </div>
            )
        }
    </div>
  )
}

export default Comments