import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getReport, getReportList, createReport, updateMemo, deleteReport } from '../service/ApiGet'; // 경로 확인!
import type { components } from '../service/api';

type ReportData = components['schemas']['ReportDTO'];
type ReportListData = components['schemas']['ReportListDTO'];
type UpdateMemoData = components['schemas']['UpdateMemoDTO'];

interface ReportState {
  reportData: ReportData | null;
  reportList: ReportListData[];
  isLoading: boolean;
}

const initialState: ReportState = {
  reportData: null,
  reportList: [],
  isLoading: false
};

export const fetchReportThunk = createAsyncThunk<ReportData, string | undefined>(
    'reportSlice/fetchReport',
    async (date) => {
        const response = await getReport(date);
        return response.result;
    }
);

export const fetchReportListThunk = createAsyncThunk<ReportListData[]>(
    'reportSlice/fetchReportList',
    async () => {
        const response = await getReportList();
        return response.result;
    }
);

export const createReportThunk = createAsyncThunk<ReportData, string | undefined>(
    'reportSlice/createReport',
    async (date) => {
        const response = await createReport(date);
        return response.result;
    }
);

export const deleteReportThunk = createAsyncThunk<number, number>(
    'reportSlice/deleteReport',
    async (reportId) => {
        await deleteReport(reportId);
        return reportId;
    }
);

interface UpdateMemoId {
    reportId: number;
    memoData: UpdateMemoData;
}
export const updateReportMemoThunk = createAsyncThunk<ReportData, UpdateMemoId>(
    'reportSlice/updateMemo',
    async (memoId : UpdateMemoId) => {
        const response = await updateMemo(memoId.reportId, memoId.memoData);
        return response.result;
    }
);

const reportSlice = createSlice({
    name: 'reportSlice',
    initialState,
    reducers: {
        clearReportData: (state) => {
            state.reportData = null;
            state.reportList = [];
        }
    },
    extraReducers: (builder) => {
        builder
        //getReport
        .addCase(fetchReportThunk.pending, (state) => {
            state.reportData = null;
            state.isLoading = true;
        })
        .addCase(fetchReportThunk.fulfilled, (state, action) => {
            state.reportData = action.payload || null;
            state.isLoading = false;
        })
        .addCase(fetchReportThunk.rejected, (state) => {
            state.isLoading = false;
        })

        //getReportList
        .addCase(fetchReportListThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(fetchReportListThunk.fulfilled, (state, action) => {
            state.reportList = action.payload;
            state.isLoading = false;
        })
        .addCase(fetchReportListThunk.rejected, (state) => {
            state.isLoading = false;
        })

        //createReport
        .addCase(createReportThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createReportThunk.fulfilled, (state, action) => {
            state.reportData = action.payload;
            state.isLoading = false;
            alert('리포트가 생성되었습니다.');
        })
        .addCase(createReportThunk.rejected, (state) => {
            state.isLoading = false;
            alert('리포트 생성에 실패했습니다.');
        })

        //deleteReport
        .addCase(deleteReportThunk.pending, (state) => {
            state.reportData = null;
            state.isLoading = true;
        })
        .addCase(deleteReportThunk.fulfilled, (state, action) => {
            state.isLoading = false;
            const deletedId = action.payload;
            if (state.reportList) {
                state.reportList = state.reportList.filter(
                    (report) => report.reportId !== deletedId
                );
            }
            alert('리포트가 삭제되었습니다.');
        })
        .addCase(deleteReportThunk.rejected, (state) => {
            state.isLoading = false;
            alert('리포트 삭제에 실패했습니다.');
        })

        //updateMemo
        .addCase(updateReportMemoThunk.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateReportMemoThunk.fulfilled, (state, action) => {
            state.reportData = action.payload;
            state.isLoading = false;
            alert('메모가 수정되었습니다.');
        })
        .addCase(updateReportMemoThunk.rejected, (state) => {
            state.isLoading = false;
            alert('메모 수정에 실패했습니다.');
        });
    },
});

export default reportSlice.reducer;