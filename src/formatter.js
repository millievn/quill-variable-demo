import Quill from 'quill';

import Vue from 'vue';

import Input from 'ant-design-vue/lib/input'; // 加载 JS
import 'ant-design-vue/lib/input/style/css'; // 加载 CSS

const Embed = Quill.import('blots/block/embed');

const InputConstruct = Vue.extend(Input);

const ATTRS = {
  SERIALIZATION: 'data-serialization',
  VALUE: 'data-value',
};

class TemplateBlot extends Embed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute(ATTRS.SERIALIZATION, value.serialization);
    node.setAttribute(ATTRS.VALUE, value.value);
    node.setAttribute('contenteditable', false);
    node.textContent = value.value;

    node.addEventListener('click', () => {
      const instance = new InputConstruct({});

      instance.$mount();
      instance.$on('pressEnter', (e) => {
        node.setAttribute(ATTRS.VALUE, e.target.value);
        instance.$destroy();
        document.body.removeChild(instance.$el);
      });
      document.body.appendChild(instance.$el);
    });

    return node;
  }

  static value(node) {
    return {
      value: node.getAttribute(ATTRS.VALUE),
      serialization: node.getAttribute(ATTRS.SERIALIZATION),
    };
  }
}

TemplateBlot.blotName = 'variable';
TemplateBlot.tagName = 'span';

Quill.register(TemplateBlot);
