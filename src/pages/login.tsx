import React, { useEffect, useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useClaimNFT, useLogin, useLogout, useProgram, useUser, useDropUnclaimedSupply, useNFTs } from '@thirdweb-dev/react/solana'
import { wallet } from './app'
import { useRouter } from 'next/router'
import type { NFT } from '@thirdweb-dev/sdk'
import Link from 'next/link'
import Image from 'next/image'

function LoginPage() {
    const [usersNft, setUsersNft] = useState<NFT | undefined>()
    const login = useLogin()
    const logout = useLogout()
    const router = useRouter()
    const { user } = useUser()
    const { publicKey, connect, select }= useWallet()

    const { program } = useProgram(
        process.env.NEXT_PUBLIC_PROGRAM_ADDRESS,
        "nft-drop"
    )

    const { data: unclaimedSupply } = useDropUnclaimedSupply(program)
    const { data: nfts, isLoading } = useNFTs(program)
    const { mutateAsync: claim } = useClaimNFT(program)

    useEffect(() => {
        if (!publicKey) {
            select(wallet.name)
            connect()
        }
    }, [publicKey, wallet])

    useEffect(() => {
        if (!user || !nfts) return

        const usersNft = nfts.find((nft) => nft.owner === user?.address)

        if (usersNft) {
            setUsersNft(usersNft)
        }
    }, [nfts, user])

    const handleLogin = async () => {
        await login()
        router.replace('/')
    }

    const handlePurchase = async () => {
        await claim({
            amount: 1,
        })
        router.replace('/')
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center text-center bg-[#F5AB0B]">
            <div className="absolute top-54 left-0 w-full h-1/4 bg-navy-600 -skey-y-6 z-10 overflow-hidden shadow-xl"></div>
        </div>
    )
}

export default LoginPage