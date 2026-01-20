export type TabKey = string | number;
export interface TabData { 
    tabName: string;
    tabKey: string;
}

export interface TableColumn{
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
}
export interface FetchDataResult {
    requestId: string;
    data: TableColumn[];
}

export const tabList: TabData[] = Array.from({ length: 2 }, (_, index)=> ({
  tabName: `Tab ${index + 1}`,
  tabKey: `tab${index + 1}`
}))

const dataList: { tabName: string; tabKey: TabKey; data: TableColumn[] }[] = tabList.map((tab, idx) => ({
    tabName: tab.tabName,
    tabKey: tab.tabKey,
    data: Array.from({ length: 10 }, (_, index) => ({
        id: `${index + 1}_${idx}`,
        name: `User ${index + 1}_${tab.tabName}_${Math.floor(Math.random() * 100)}`,
        email: `user${index + 1}@example.com`,
        phone: `1234567890`,
        address: `123 Main St`,
    }))
}))

const MAX_RETRIES = 3
export async function fetchData(tabKey: TabKey, requestId:string) {
    function fetchWithRetry (retryCount = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const flag = Math.floor(Math.random() * 10) % 2 === 0;
                if (flag) {
                    resolve({
                        requestId,
                        data: dataList.find(item => item.tabKey === tabKey)?.data || []
                    });
                } else {
                    reject(new Error("Failed to fetch data"));
                }
            }, Math.floor(Math.random() * 10) * 100);
        }).catch(async (error): Promise<any> => {
            // 如果还有重试次数，进行重试
            if (retryCount < MAX_RETRIES) {
                console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`)
                const delay = Math.pow(2, retryCount) * 1000 // 指数退避
                await new Promise(resolve => setTimeout(resolve, delay))
                return fetchWithRetry(retryCount + 1)
            }
            throw error
        })
    }
    
    return fetchWithRetry(0)
}

