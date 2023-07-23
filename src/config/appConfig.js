const appConfig = {
  editor: {
    toolbarType: {
      email: {
        // plugins: [Indent, Font],
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'unlink',
            // '|',
            // 'alignment',
            // '|',
            // 'increase indent',
            // 'decrease indent',
            // '|',
            // 'bulletedList',
            // 'numberedList',
            '|',
            'fontColor',
            'highlight',
            '|',
            'insertTable',
          ],
        },
      },
      notes: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'heading',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'link',
            'unlink',
            '|',
            'alignment',
            '|',
            'outdent',
            'indent',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'fontColor',
            'highlight',
          ],
        },
      },
      restrictedMode: {
        toolbar: {
          items: ['undo', 'redo', '|', 'bold', 'italic', 'underline', '|', 'link', 'unlink', '|'],
        },
      },
    },
  },
};

export default appConfig;
