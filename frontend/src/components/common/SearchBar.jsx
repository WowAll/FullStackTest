import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '@/components/ui/input'

const SearchBar = () => {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute top-1/2 right-3 h-6 w-6 -translate-y-1/2 text-black" />
            <Input
                type={'text'}
                placeholder="검색어를 입력하세요"
                className="placeholder:text-gray-400"
            />
        </div>
    )
}

export default SearchBar