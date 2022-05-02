import { CourseCard, CourseList } from "@components/ui/course"
import {getAllCourses} from "@content/courses/fetcher";
import {BaseLayout} from "@components/ui/layout";
import {useAccount, useWalletInfo} from "@components/hooks/web3";
import {Button} from "@components/ui/common";
import {OrderModal} from "@components/ui/order";
import {useState} from "react";
import {MarketHeader} from "@components/ui/marketplace";
import {useWeb3} from "@components/providers";

export default function Marketplace({courses}) {
    const {web3} = useWeb3();
    const [selectedCourse, setSelectedCourse] = useState(null);
    const {canPurchaseCourse, account} = useWalletInfo();
    const purchaseCourse = async (order) => {
        const hexCourseId = web3.utils.utf8ToHex(selectedCourse.id);
        const orderHash = web3.utils.soliditySha3(
            {type: "bytes16", value: hexCourseId},
            {type: "address", value: account.data},
        );
        const emailHash = web3.utils.sha3(order.email);
        const proof = web3.utils.soliditySha3(
            {type: "bytes32", value: orderHash},
            {type: "bytes32", value: emailHash},
        )
        //emailHash + courseHash
        const value = web3.utils.toWei(order.price);

        try {
            const result = await contract.methods.purchaseCourse(
                hexCourseId,
                proof
            ).send({from: account.data, value});
            console.log(result)
        } catch {
            console.error('Purchase course operation failed.');
        }
    }

    return (
        <>
            <MarketHeader />
            <CourseList courses={courses}>
                {course =>
                    <CourseCard
                        key={course.id}
                        disabled={!canPurchaseCourse}
                        course={course}
                        Footer={() =>  <div className={'mt-4'}>
                            <Button
                                disabled={!canPurchaseCourse}
                                onClick={() => setSelectedCourse(course)}
                                variant='lightPurple'>Purchase</Button>
                        </div>}
                    />
                }
            </CourseList>
            {selectedCourse && <OrderModal
                onSubmit={purchaseCourse}
                onClose={() => setSelectedCourse(null)}
                course={selectedCourse}
            />}
        </>

    )
}
export function getStaticProps() {
    const {data} = getAllCourses()
    return {
        props: {
            courses: data
        }
    }
}

Marketplace.Layout = BaseLayout;
