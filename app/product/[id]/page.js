// app/product/[id]/page.js
import React from "react";
import { notFound } from "next/navigation";
import DisplayProduct from "../../../components/DisplayProduct";
import getProducts from "../../../lib/woocommerce";

const Page = async ({ params }) => {
  const product = await getProducts;

  if (!product) {
    notFound();
  }

  return (
    <section>
      {/* <script
        id="product-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      /> */}
      <DisplayProduct
        id={product.id}
        name={product.name}
        slug={product.slug}
        permalink={product.permalink}
        dateCreated={product.date_created}
        dateCreatedGmt={product.date_created_gmt}
        dateModified={product.date_modified}
        dateModifiedGmt={product.date_modified_gmt}
        type={product.type}
        status={product.status}
        featured={product.featured}
        catalogVisibility={product.catalog_visibility}
        description={product.description}
        shortDescription={product.short_description}
        sku={product.sku}
        price={product.price}
        regularPrice={product.regular_price}
        salePrice={product.sale_price}
        dateOnSaleFrom={product.date_on_sale_from}
        dateOnSaleFromGmt={product.date_on_sale_from_gmt}
        dateOnSaleTo={product.date_on_sale_to}
        dateOnSaleToGmt={product.date_on_sale_to_gmt}
        onSale={product.on_sale}
        purchasable={product.purchasable}
        totalSales={product.total_sales}
        virtual={product.virtual}
        downloadable={product.downloadable}
        downloads={product.downloads}
        downloadLimit={product.download_limit}
        downloadExpiry={product.download_expiry}
        externalUrl={product.external_url}
        buttonText={product.button_text}
        taxStatus={product.tax_status}
        taxClass={product.tax_class}
        manageStock={product.manage_stock}
        stockQuantity={product.stock_quantity}
        backorders={product.backorders}
        backordersAllowed={product.backorders_allowed}
        backordered={product.backordered}
        lowStockAmount={product.low_stock_amount}
        soldIndividually={product.sold_individually}
        weight={product.weight}
        dimensions={product.dimensions}
        shippingRequired={product.shipping_required}
        shippingTaxable={product.shipping_taxable}
        shippingClass={product.shipping_class}
        shippingClassId={product.shipping_class_id}
        reviewsAllowed={product.reviews_allowed}
        averageRating={product.average_rating}
        ratingCount={product.rating_count}
        upsellIds={product.upsell_ids}
        crossSellIds={product.cross_sell_ids}
        parentId={product.parent_id}
        purchaseNote={product.purchase_note}
        categories={product.categories}
        tags={product.tags}
        images={product.images}
        attributes={product.attributes}
        defaultAttributes={product.default_attributes}
        variations={product.variations}
        groupedProducts={product.grouped_products}
        menuOrder={product.menu_order}
        priceHtml={product.price_html}
        relatedIds={product.related_ids}
        metaData={product.meta_data}
        stockStatus={product.stock_status}
        hasOptions={product.has_options}
        postPassword={product.post_password}
        globalUniqueId={product.global_unique_id}
        customField={product.custom_field}
        links={product._links}
      />
    </section>
  );
};

export default Page;
