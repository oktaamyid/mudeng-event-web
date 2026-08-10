import { notFound } from "next/navigation";
import { Metadata } from "next";
import { coursesData, coursesList } from "@/data/courses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReset from "@/components/ScrollToTop";
import CourseDetail from "@/components/course-detail/CourseDetail";

export async function generateStaticParams() {
    return coursesList.map((course) => ({
        slug: course.slug,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const resolvedParams = await params;
    const course = coursesData[resolvedParams.slug];

    if (!course) {
        return { title: "Course Not Found" };
    }

    return {
        title: `${course.title} | MUDENG Course`,
        description: course.description,
    };
}

export default async function CoursePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const resolvedParams = await params;
    const course = coursesData[resolvedParams.slug];

    if (!course) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col overflow-x-clip">
            <ScrollReset />
            <Navbar />
            <main className="flex-1 overflow-x-clip">
                <CourseDetail course={course} />
            </main>
            <Footer />
        </div>
    );
}
