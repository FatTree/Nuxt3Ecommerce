import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { cartProductModel } from '~/models/viewModel'

const storeName = 'ShoppingCart';
export const useShoppingCartStore = defineStore(storeName, () => {
    // 使用 ref 定義購物車
    const cart: Ref<cartProductModel[]> = ref([]);

    // 從 localStorage 加載購物車數據
    const loadCart = () => {
        const storedCart = localStorage.getItem(storeName);
        
        if (storedCart) {
            cart.value = JSON.parse(storedCart);
        }
    }


    // 保存購物車數據到 localStorage
    const saveCart = () => {
        localStorage.setItem(storeName, JSON.stringify(cart.value));
    }

    // 添加商品到購物車
    const addToCart = (product: cartProductModel) => {
        const item = cart.value.find(i => i.id === product.id);
        if (item) {
            item.quantity = Number(product.quantity) + Number(item.quantity);
        } else {
            cart.value.push({ ...product, quantity: product.quantity });
        }
        saveCart();
    }

    // 從購物車中移除商品
    const removeFromCart = (productId: string) => {
        cart.value = cart.value.filter(item => item.id !== productId);
        saveCart();
    }

    // 清空購物車
    const clearCart = () => {
        cart.value = []
        saveCart();
    }

    const findItemQuantity = (id: string): number => {
        const item = cart.value.find(i => i.id === id);
        if(item) {
            return item.quantity;
        }
        return 0;
    }

    // 計算購物車中商品的總數量
    const totalQuantity = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.quantity, 0)
    });

    // 計算購物車中的總金額
    const totalAmount = computed(() => {
        return cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
    });

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalQuantity,
        totalAmount,
        loadCart,
        findItemQuantity
    }
})
