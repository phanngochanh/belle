<?php
/**
 * @category    CleverSoft
 * @package     CleverProduct
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */

namespace CleverSoft\CleverProduct\Model\Widget\Source;


class CountdownPosition implements \Magento\Framework\Option\ArrayInterface{
    public function toOptionArray(){
        $types = [
            ['value' => 'over_feature_img', 'label' => __('Over Feature Image')],
            ['value' => 'product_metadata', 'label' => __('In Product Metadata')]
        ];

        return $types;
    }
}
