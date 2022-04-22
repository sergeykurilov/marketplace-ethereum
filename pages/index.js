import { Hero } from "@components/ui/common"
import {CourseList} from "@components/ui/course";
import {getAllCourses} from "@content/courses/fetcher";
import {BaseLayout} from "@components/ui/layout";

export default function Home({courses}) {
    return (
        <>
            <Hero />
            <CourseList
                courses={courses}
            />
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

Home.Layout = BaseLayout;
