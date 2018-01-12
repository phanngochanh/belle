<?php
/**
 * @category    CleverSoft
 * @package     CleverBase
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */

namespace CleverSoft\Base\Model\System\Config\Source\Category\Grid;
class Ratioimage implements \Magento\Framework\Option\ArrayInterface{


    public function toOptionArray()
    {
        $types = [
            ['value' => '1:1', 'label' => __('Square Rectangle')],
            ['value' => '3:4', 'label' => __('Horizontal Rectangle')],
            ['value' => '4:3', 'label' => __('Vertical Rectangle')]
        ];

        return $types;
    }

}