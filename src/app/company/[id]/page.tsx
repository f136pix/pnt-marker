import Header from "@/components/shared/Header";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import useSWR from "swr";
import {fetcher} from "../../../../utils";
import {axiosGetHandler} from "../../../../utils/axios";
import {Button} from "@mantine/core";
import CompanyUsersList from "@/app/company/CompanyUsersLists/CompanyUsersList";

// fetching company data server sided
// export async function getServerSideProps(context) {
//     const { id } = context.query;
//     const { data, error } = useSWR(`/api/company?id=${id}`, fetcher);
//     return { props: { data } };
// }


async function Page(context) {
    let errMsg: false | string = false;
    let res : any;
    const {params} = context;
    const {id} = params;
    const retrieveData = async() => {
    try {
        res = await axiosGetHandler(`company?id=${id}`);
    } catch (err: any) {
        if (err.response.data.err == 'company not found') {
            console.log('not found');
            errMsg = 'This user is not anexed to any company';
        } else {
            errMsg = 'There was a unexpected error';
        }
    }
    };

    await retrieveData();
    return (
        <div>
            <Header/>
            {!errMsg ?
                <CompanyUsersList company={res?.data.company}/> :
                <div className={'h-screen bg-neutral-800 text-neutral-400 flex flex-col justify-center w-screen'}>
                    <h1 className={'bg-slate-900 mb-[10rem] font-bold text-[2rem] text-center w-8/12 mx-auto uppercase p-[2rem] rounded'}>{errMsg}</h1>
                </div>
            }
        </div>
    );
}

export default Page;
