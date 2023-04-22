import { ApplicationError } from "../error/ApplicationError";

function getPaginatedData(page, pageSize, datas) {
    try {

        const pageSizeValue = pageSize || 10;
        const pageNumber = page || 1;

        const allData = datas;

        const totalPages = Math.ceil(allData.length / pageSizeValue);

        const startIndex = (pageNumber - 1) * pageSizeValue;
        const endIndex = startIndex + pageSizeValue;

        const currentPageData = allData.slice(startIndex, endIndex);

        return ({
            page,
            data: currentPageData,
            totalPages,
        });
    } catch (err) {
        console.log(err);
        throw new ApplicationError("Something wrong happenned!",400);
    }
}

export { getPaginatedData }