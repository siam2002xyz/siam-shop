import React from 'react'
import { RiFacebookBoxFill, RiFacebookLine, RiGithubFill, RiInstagramLine, RiLinkedinFill, RiTwitchFill, RiYoutubeLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

const SocialIcons = () => {
  return (
    <div className='flex gap-6 pr-4'>
        <Link to={'/'} className='text-[#08d9d6] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiYoutubeLine />
        </Link>
        <Link to={'/'} className='text-[#f08a5d] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiInstagramLine />
        </Link>
        <Link to={'/'} className='text-[#ff2a63] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiFacebookBoxFill />
        </Link>
        <Link to={'/'} className='text-[#eaeaea] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiLinkedinFill />
        </Link>
        <Link to={'/'} className='text-[#f9ed69] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiTwitchFill />
        </Link>
        <Link to={'/'} className='text-[#5272f2] text-2xl hover:translate-y-1 transition-all duration-500'>
            <RiGithubFill />
        </Link>
    </div>
  )
}

export default SocialIcons