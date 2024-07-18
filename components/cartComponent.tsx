'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectProducts,
  selectTotalPrice,
} from '@/redux/feature/cart/cartSlice';
import { useEffect, useState } from 'react';
import { CartProductType } from '@/libs/difinition';
import { Image } from '@nextui-org/react';
import { Button } from '@nextui-org/button';
import { GrMapLocation } from 'react-icons/gr';
import { AnimatePresence, domAnimation, LazyMotion, m } from 'framer-motion';
import { MdOutlineLocalPhone } from 'react-icons/md';
import { BsShop } from 'react-icons/bs';
import ListProductAddToCart from './CartListProductComponent';
import CartRightSection from './CartRightSection';

export default function CartComponent() {
  const products = useAppSelector(selectProducts);
  const totalPrice = useAppSelector(selectTotalPrice);
  const dispatch = useAppDispatch();

  const [selectedProduct, setSelectedProduct] =
    useState<CartProductType | null>(null);
  const [productQuantities, setProductQuantities] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const initialQuantities: { [key: string]: number } = {};
    products.forEach((product: CartProductType) => {
      initialQuantities[product.slug] = productQuantities[product.slug] || 1;
    });
    setProductQuantities(initialQuantities);
    if (!selectedProduct && products.length > 0) {
      setSelectedProduct(products[0]);
    }
  }, [products]);

  const increaseQuantity = (slug: string) => {
    if (!(slug in productQuantities)) {
      setProductQuantities({ ...productQuantities, [slug]: 1 });
    } else {
      dispatch(incrementQuantity(slug));
      setProductQuantities({
        ...productQuantities,
        [slug]: productQuantities[slug] + 1,
      });
    }
  };

  const decreaseQuantity = (slug: string) => {
    if (!(slug in productQuantities)) {
      return;
    }

    if (productQuantities[slug] === 1) {
      dispatch(removeFromCart(slug));
      const updatedQuantities = { ...productQuantities };
      delete updatedQuantities[slug];
      setProductQuantities(updatedQuantities);
    } else {
      dispatch(decrementQuantity(slug));
      setProductQuantities({
        ...productQuantities,
        [slug]: productQuantities[slug] - 1,
      });
    }
  };

  const handleRemoveFromCart = (slug: string) => {
    dispatch(removeFromCart(slug));
    const updatedQuantities = { ...productQuantities };
    delete updatedQuantities[slug];
    setProductQuantities(updatedQuantities);
  };

  const handleGetDirections = (location: string) => {
    const [lat, lng] = location.split(',');
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleClickImage = (product: CartProductType) => {
    setSelectedProduct(product);
  };

  const calculateOriginalPrice = () => {
    let totalOriginalPrice = 0;
    products.forEach((product: CartProductType) => {
      const quantity = productQuantities[product.slug] || 0;
      totalOriginalPrice += quantity * product.price;
    });
    return totalOriginalPrice.toFixed(2);
  };

  const calculateTotalDiscount = () => {
    let totalDiscount = 0;
    products.forEach((product: CartProductType) => {
      const quantity = productQuantities[product.slug] || 0;
      totalDiscount += quantity * product.discountPrice;
    });
    return totalDiscount.toFixed(2);
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product: CartProductType) => {
      const quantity = productQuantities[product.slug] || 0;
      total += quantity * (product.price - product.discountPrice);
    });
    return total.toFixed(2);
  };

  return (
    <main>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center ">
          <Image
            alt="cartEmpty"
            src={'https://store.istad.co/media/product_images/cartEmpty.png'}
            width={200}
            height={200}
          />
          <p className="mt-4 text-2xl font-semibold ">Your cart is empty!</p>
          <p>Look like you {"haven'"}t made any choice yet...</p>
        </div>
      )}
      {products.length !== 0 && (
        <section className="my-8 flex h-full w-full gap-8">
          {/* Left */}
          <div className="w-full flex-none lg:w-[60%] md:w-[50%]">
            <div className="flex h-full flex-1 flex-col">
              <AnimatePresence initial={false} mode="wait">
                <LazyMotion features={domAnimation}>
                  <m.form
                    animate="center"
                    className="flex flex-col gap-3"
                    exit="exit"
                    initial="enter"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <h1 className="text-fourground-700 lg:pb-4 pb-0 lg:text-2xl text-xl lg:px-0 px-4 font-semibold dark:text-white">
                      Review your add to cart
                    </h1>
                    <div className="max-h-[none] overflow-y-auto px-4 scrollbar-hide lg:max-h-[480px] md:max-h-[430px] lg:px-0">
                      {products.map((product: CartProductType) => (
                        <div
                          key={product.slug}
                        >
                          <ListProductAddToCart
                            product={product}
                            quantity={productQuantities[product.slug] || 0}
                            imageClick={() => handleClickImage(product)}
                            increaseQty={() => increaseQuantity(product.slug)}
                            decreaseQty={() => decreaseQuantity(product.slug)}
                            removeFromCart={() =>
                              handleRemoveFromCart(product.slug)
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className='lg:px-0 px-4'>
                      {/* this is the subtotal */}
                      <dl className="flex flex-col gap-4">
                        <div className="flex justify-between">
                          <dt className="text-fourground-600 dark:text-fourground-300">
                            Subtotal
                          </dt>
                          <dd className="text-fourground-600 dark:text-fourground-300 font-semibold">
                            ${calculateOriginalPrice()}
                          </dd>
                        </div>
                      </dl>

                      {/* this is the discount */}
                      <dl className="flex flex-col gap-4">
                        <div className="flex justify-between">
                          <dt className="text-fourground-600 dark:text-fourground-300">
                            Discount
                          </dt>
                          <dd className="font-semibold text-success">
                            - ${calculateTotalDiscount()}
                          </dd>
                        </div>
                      </dl>

                      {/* this is the total */}
                      <dl className="flex flex-col gap-4 border-t-small border-divider py-2 ">
                        <div className="flex justify-between">
                          <dt className="text-fourground-600 dark:text-fourground-300">
                            Total
                          </dt>
                          <dd className="text-fourground-600 dark:text-fourground-300 font-semibold">
                            ${calculateTotalPrice()}
                          </dd>
                        </div>
                      </dl>

                      <Button
                        fullWidth
                        className="text-forceground-200 font-md bg-gradient-to-r from-pink-500 to-yellow-500 text-xl"
                        size="lg"
                      >
                        Check out
                      </Button>
                    </div>
                  </m.form>
                </LazyMotion>
              </AnimatePresence>
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:block md:block lg:w-[40%] max-w-[40%] ">
            <h3 className="text-fourground-700 pb-4  lg:text-2xl text-xl font-semibold dark:text-white">
              Product Detail
            </h3>
            {selectedProduct && (
              <CartRightSection
                product={selectedProduct}
                handleGetDirections={handleGetDirections}
              />
            )}
          </div>
        </section>
      )}
    </main>
  );
}
