var app = new Vue({
    el: '#app',
    data: { // 定義資料
        products: [ // 一組陣列，包初始資料
            {       // 每一筆資料用物件包裹
                id: 1586934917210,
                title: '[韓國/純銀] 虔信時刻戒指',
                category: '戒指',
                description: '商品材質：S925純銀',
                content: '純銀飾品若無佩戴時，請先保持乾燥狀態，再放置飾品盒或是夾鏈袋乾燥陰涼處保存，避免氧化發黑。',
                imageUrl: 'https://images.unsplash.com/photo-1583222879553-b69a52cd65b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1934&q=80',
                enabled: true,
                origin_price: 400,
                price: 380,
                unit: '只'
            },
            {
                id: 1196934917910,
                title: '[施華洛世奇水晶] 浪漫際遇鍊戒',
                category: '戒指',
                description: '商品材質：S925純銀',
                content: '純銀飾品若無佩戴時，請先保持乾燥狀態，再放置飾品盒或是夾鏈袋乾燥陰涼處保存，避免氧化發黑。',
                imageUrl: 'https://images.unsplash.com/photo-1583533816719-8fe57c9f57e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                enabled: false,
                origin_price: 580,
                price: 560,
                unit: '只'
            },
        ],
        tempProduct: {},  // 暫時存放資料（input 輸入的資料）的地方，避免直接變更原始資料
    }, methods: { // 定義 function
        // 更新產品
        updateProduct() {
            const vm = this;
            if (vm.tempProduct.id) { // （當 id 已存在時）編輯產品
                const id = vm.tempProduct.id;
                vm.products.forEach(function (item, i) { // 依序抓出陣列裡的 物件, 索引
                    if (item.id === id) { // 若陣列裡的 id 等於 目前編輯物件的 id
                        vm.products[i] = vm.tempProduct; // 將符合條件的第 i 筆資料 賦予新的資料
                        vm.$set(vm.products, i, vm.tempProduct);  // 強制雙向綁定
                    }
                })
            } else { // 新增產品
                const id = new Date().getTime(); // 取目前時間毫秒 
                vm.tempProduct.id = id; // 將毫秒數字 賦予到 新增商品的 id（因此每個新增商品的 id 都會不一樣）
                vm.products.push(vm.tempProduct); // 將新增商品的物件 push 到陣列裡
                vm.tempProduct = {}; // 新增完後 清空模板資料
            };
            $('#addModal').modal('hide'); // 按下確定後 Modal 隱藏
        },
        // 開啟 Modal
        openModal(mode, item) {
            const vm = this;
            switch (mode) {
                case 'new': // 新增（不須物件拷貝）
                    $('#addModal').modal('show');
                    vm.tempProduct = {}; // 給新的參考路徑
                    break;
                case 'edit': // 編輯
                    $('#addModal').modal('show');
                    vm.tempProduct = Object.assign({}, item) // 物件拷貝
                    break;
                case 'dele': // 刪除
                    $('#deleModal').modal('show');
                    vm.tempProduct = Object.assign({}, item) // 物件拷貝                    
                    break;
                default:
                    break;
            }
        },
        // 刪除產品
        deleProduct() {
            const vm = this;
            if (vm.tempProduct.id) {
                const id = vm.tempProduct.id;
                vm.products.forEach((item, i) => { // 依序取出陣列裡的 物件 索引
                    if (item.id === id) { // 如果 id 相符合
                        vm.products.splice(i, 1); // 刪除符合條件的第 i 筆資料
                        vm.tempProduct = {}; // 刪除完後 清空模板資料
                    }
                });
            };
            $('#deleModal').modal('hide') // 按下確定刪除後 Modal 隱藏
        }
    }
});
