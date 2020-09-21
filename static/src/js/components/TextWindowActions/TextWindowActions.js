
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'

import { constructDownloadableFile } from '../../util/files/constructDownloadableFile'

import EDSCModalContainer from '../../containers/EDSCModalContainer/EDSCModalContainer'

import Button from '../Button/Button'

import './TextWindowActions.scss'

/**
 * Renders TextWindowActions.
 * @param {Node} children - React children to display in the text window
 * @param {String} clipboardContents - An string that will be copied to the users clipboard.
 * @param {String} fileContents - An optional string to be saved to the users computer.
 * @param {String} fileName - An optional string to to set the name for the file saved to the users computer.
 * @param {String} id - The id to use for the boostrap modal.
 * @param {String} modalTitle - The title for the modal.
 */
export const TextWindowActions = ({
  children,
  clipboardContents,
  fileContents,
  fileName,
  id,
  modalTitle
}) => {
  const supportsClipboard = document.queryCommandSupported('copy')
  const textareaElRef = useRef(null)
  const [copySuccess, setCopySuccess] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const handleOpen = () => {
    setShowModal(true)
  }

  const handleClose = () => {
    setShowModal(false)
  }

  const copyToClipboard = () => {
    if (textareaElRef.current) {
      textareaElRef.current.select()
      document.execCommand('copy')
      setCopySuccess(true)
    }
  }

  return (
    <div className="text-window-actions">
      <header className="text-window-actions__actions">
        {
          supportsClipboard && (
            <Button
              className="text-window-actions__action text-window-actions__action--copy"
              bootstrapSize="sm"
              icon="copy"
              onClick={copyToClipboard}
              label="Copy"
            >
              Copy
            </Button>
          )
        }
        {
          (fileContents && fileName) && (
            <Button
              className="text-window-actions__action text-window-actions__action--save"
              bootstrapSize="sm"
              label="Save"
              icon="save"
              onClick={(e) => {
                constructDownloadableFile(fileContents, fileName)
                e.stopPropagation()
              }}
            >
              Save
            </Button>
          )
        }
        <Button
          className="text-window-actions__action text-window-actions__action--expand"
          bootstrapSize="sm"
          onClick={handleOpen}
          label="Expand"
          icon="expand"
        >
          Expand
        </Button>
        {
          copySuccess && (
            <span className="text-window-actions__copied-success">
              Copied!
            </span>
          )
        }
      </header>
      <div className="text-window-actions__body">
        {children}
      </div>
      {
        supportsClipboard && (
          <form
            style={{
              position: 'absolute',
              left: '-99999px',
              height: 0,
              width: 0
            }}
            aria-hidden="true"
          >
            <textarea
              ref={textareaElRef}
              value={clipboardContents}
              readOnly
            />
          </form>
        )
      }
      <EDSCModalContainer
        id={`order-status-links-modal__${id}`}
        modalClassNames="order-status-links-modal"
        onClose={handleClose}
        isOpen={showModal}
        size="lg"
        title={modalTitle}
        body={(
          <>
            <header className="text-window-actions__actions">
              {
                supportsClipboard && (
                  <Button
                    className="text-window-actions__action text-window-actions__modal action text-window-actions__modal-action--copy"
                    bootstrapSize="sm"
                    icon="copy"
                    onClick={copyToClipboard}
                    label="Copy"
                  >
                    Copy
                  </Button>
                )
              }
              {
                (fileContents && fileName) && (
                  <Button
                    className="text-window-actions__action text-window-actions__modal action text-window-actions__modal-action--save"
                    bootstrapSize="sm"
                    label="Save"
                    icon="save"
                    onClick={(e) => {
                      constructDownloadableFile(fileContents, fileName)
                      e.stopPropagation()
                    }}
                  >
                    Save
                  </Button>
                )
              }
            </header>
            <div className="text-window-actions__modal-body">
              {children}
            </div>
          </>
        )}
      />
    </div>
  )
}

TextWindowActions.defaultProps = {
  children: null,
  clipboardContents: '',
  fileContents: null,
  fileName: null,
  id: null,
  modalTitle: null
}

TextWindowActions.propTypes = {
  children: PropTypes.node,
  clipboardContents: PropTypes.string,
  fileContents: PropTypes.string,
  fileName: PropTypes.string,
  id: PropTypes.string,
  modalTitle: PropTypes.string
}

export default TextWindowActions
