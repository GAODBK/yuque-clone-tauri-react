// src/app/(dashboard)/dashboard/library/_components/library-new-form.tsx

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {BsJournalBookmark} from "react-icons/bs";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useNavigate} from "react-router-dom";
import * as z from 'zod'
import {Form, FormControl, FormField, FormItem, FormMessage} from '@/components/ui/form';
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {createLibrary} from "@/app/(dashboard)/dashboard/library/actions/create-library";
import {toast} from "sonner";

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required',
    }),
    description: z.string().min(1, {
        message: 'Description is required',
    })
})

const LibraryNewForm = () => {
    const router = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: ""
        }
    })

    const {isSubmitting, isValid} = form.formState

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const library = await createLibrary({
                ...values,
            })
            toast.success(`创建成功`)
            // 个人用不做user等相关功能
            router(`/malred/${library?.id}`)
            // router.refresh()

        } catch (err) {
            toast.error(`Something went wrong`)
            console.error('Something went wrong', err);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={`p-0`}>
                    <span className={`text-sm`}>新建知识库</span>
                </div>
            </DialogTrigger>
            <DialogContent className={`w-96`}>
                <DialogHeader>
                    <DialogTitle className={`cursor-pointer`}>新建知识库</DialogTitle>
                </DialogHeader>
                <Form
                    {...form}
                >
                    <form
                        onSubmit={form.handleSubmit(async () => {
                            await onSubmit(form.getValues())
                        })}
                        className="space-y-6">
                        <div className={`flex flex-col justify-center gap-y-2`}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem className={`flex gap-x-2`}>
                                        <div
                                            className={`mt-2 flex items-center justify-center size-10
                                             p-1 border rounded-md`}>
                                            <BsJournalBookmark className={`size-5 text-blue-700`}/>
                                        </div>
                                        <FormControl>
                                            <Input className={`h-10`}
                                                   {...field}
                                                   placeholder={`知识库名称`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder={`知识库简介`}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter className="sm:justify-start">
                            <Button
                                type={'submit'}
                                disabled={isSubmitting || !isValid}
                                className={`text-white font-bold hover:bg-green-700 bg-green-500 w-full`}
                                variant="secondary">
                                创建
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default LibraryNewForm;