export class ResumesService {
    constructor(resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    createResume = async (userId, name, title, content) => {

        if (!title) {
            throw new Error('제목을 입력하세요.');
        } else if (!content) {
            throw new Error('자기소개를 입력하세요.');
        }

        const createResume = await this.resumeRepository.createResume(
            userId,
            name,
            title,
            content
        );

        return createResume;
    }

    findAllResumes = async (orderKey, orderValue) => {

        const resumes = await this.resumeRepository.findAllResumes(
            orderKey,
            orderValue
        )

        if (!resumes) {
            throw new Error('이력서 조회에 실패하였습니다.');
        }

        return resumes;
    }

    findResume = async (resumeId) => {

        if(!resumeId) {
            throw new Error('이력서를 선택하세요.')
        }

        const resume = await this.resumeRepository.findResume(resumeId);

        if (!resume) {
            throw new Error('이력서 조회에 실패하였습니다.');
        }

        return {
            resumeId: resume.resumeId,
            userId: resume.userId,
            title: resume.title,
            content: resume.content,
            author: resume.author,
            status: resume.status,
            countlike: resume.countlike,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        }
    }

    editResume = async (resumeId, userId, title, content, status) => {

        if (!resumeId) {
            throw new Error('이력서를 선택하세요.');
        } else if (!title) {
            throw new Error('제목을 입력하세요.');
        } else if (!content) {
            throw new Error('내용을 입력하세요.');
        } else if (!status) {
            throw new Error('상태를 입력하세요.');
        }

        const id = await this.resumeRepository.findResume(resumeId);

        if (!id) {
            throw new Error('이력서 조회에 실패하였습니다.');
        } else if (id.userId !== userId) {
            throw new Error('수정할 권한이 없습니다.');
        }

        const resume = await this.resumeRepository.editResume(
            resumeId,
            userId,
            title,
            content,
            status
        )

        return {
            resumeId: resume.resumeId,
            userId: resume.userId,
            title: resume.title,
            content: resume.content,
            author: resume.author,
            status: resume.status,
            countlike: resume.countlike,
            createdAt: resume.createdAt,
            updatedAt: resume.updatedAt,
        }
    }

    deleteResume = async (resumeId, userId) => {

        if(!resumeId) {
            throw new Error('이력서를 선택하세요.')
        }
        
        const id = await this.resumeRepository.findResume(resumeId);

        if (!id) {
            throw new Error('이력서 조회에 실패하였습니다.');
        } else if (id.userId !== userId) {
            throw new Error('수정할 권한이 없습니다.');;
        }

        const resume = await this.resumeRepository.deleteResume(
            resumeId,
            userId
        );

        return resume;
    }
}