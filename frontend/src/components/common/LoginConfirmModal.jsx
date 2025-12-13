import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { useModalStore } from '@/stores/useModalStore'
import { Button } from '../ui/button'

export default function LoginConfirmModal() {
    const { isOpen, closeModal } = useModalStore()

    return (
        <Dialog.Root open={isOpen} onOpenChange={closeModal}>
            <Dialog.Portal>
                <Dialog.Overlay />
                <Dialog.Content>
                    <div className="flex flex-col space-y-2 text-center sm:text-left">
                        <Dialog.Title></Dialog.Title>
                        <Dialog.Description></Dialog.Description>
                    </div>
                    <div className="mt-2 flex justify-end gap-2">
                        <Button variant={'outline'}>로그인 하러 가기</Button>
                    </div>
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
