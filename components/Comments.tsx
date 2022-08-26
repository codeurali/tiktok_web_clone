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
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-[70px]'>
        <div className='overflow-scroll lg:h-[475px]' >
            {
                comments?.length ? (
                    <div>
                    {
                      comments?.map((item: IComment, idx: number)=> (
                        <>
                            {allUsers.map((user: IUser)=> (
                                user._id === (item.postedBy._ref|| item.postedBy._id) && (
                                  
                                  
                                    <div className="text-black p-4 flex items-start max-w-lg cursor-pointer">
                                      <Link href={`/profile/${user._id}`} >
                                      <>
                                      <Image
                                            src={user.image}
                                            width={32}
                                            height={32}
                                            className='rounded-full'
                                            alt='profile photo'
                                        />
                                      <div>
                                        <div className="bg-white rounded-3xl px-4 pt-2 pb-2.5">
                                          <div className="">
                                            <p className='flex gap-1 item-center text-md font-semibold text-sm leading-relaxed text-primary lowercase items-center pb-1 mb-1' >
                                              {user.userName.replaceAll(' ', '')}
                                              <GoVerified className='text-blue-400' />
                                            </p>
                                          </div>
                                          <div className="text-normal leading-snug md:leading-normal"
                                          >
                                            {item.comment}
                                          </div>
                                        </div>
                                      </div>
                                      </>
                                      </Link>
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
                <div className=' md:absolute md:bottom-0 left-0 right-0 pb-6 px-2 md:px-5 flex flex-col' >
                    <form onSubmit={addComment} className='flex gap-3 place-content-end' >
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