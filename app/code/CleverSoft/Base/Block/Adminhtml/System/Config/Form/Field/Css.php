<?php
/**
 * @category    CleverSoft
 * @package     CleverBase
 * @copyright   Copyright © 2017 CleverSoft., JSC. All Rights Reserved.
 * @author 		ZooExtension.com
 * @email       magento.cleversoft@gmail.com
 */

namespace CleverSoft\Base\Block\Adminhtml\System\Config\Form\Field;
use Magento\Config\Block\System\Config\Form\Field;
use Magento\Framework\Data\Form\Element\AbstractElement;

class Css extends Field {
    protected function _getElementHtml(AbstractElement $element){
        $html = parent::_getElementHtml($element);
        $html .= '
       		<script>
				require([
				        "jquery",
						"CleverSoft_Base/js/codemirror"
                    ],function(){
                        CodeMirror.fromTextArea(document.getElementById("'.$element->getHtmlId().'"), {
                            lineNumbers: true
                          });
                    });
			</script>
       	';
        return $html;
    }
}
?>